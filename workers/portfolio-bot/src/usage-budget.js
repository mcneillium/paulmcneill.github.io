/* One persistent coordinator serialises reservations across all Worker instances.
 * Failed calls keep their reservation, so retries cannot exceed the daily cap.
 */
export class UsageBudget {
  constructor(state) {
    this.storage = state.storage;
  }

  async fetch(request) {
    const { client } = await request.json();
    if (typeof client !== 'string' || !/^[a-f0-9]{64}$/.test(client)) {
      return Response.json({ error: 'invalid-client' }, { status: 400 });
    }
    const now = Date.now();
    const day = new Date(now).toISOString().slice(0, 10);
    const hour = Math.floor(now / 3600000);
    const result = await this.storage.transaction(async storage => {
      let budget = await storage.get('budget');
      if (!budget || budget.day !== day) budget = { day, total: 0, clients: {} };
      if (budget.total >= 100) return { allowed: false, reason: 'daily-budget' };
      const visitor = budget.clients[client] || { dayCount: 0, hour, hourCount: 0 };
      if (visitor.hour !== hour) {
        visitor.hour = hour;
        visitor.hourCount = 0;
      }
      if (visitor.dayCount >= 20 || visitor.hourCount >= 10) {
        return { allowed: false, reason: 'visitor-limit' };
      }
      visitor.dayCount++;
      visitor.hourCount++;
      budget.clients[client] = visitor;
      budget.total++;
      await storage.put('budget', budget);
      return { allowed: true };
    });
    if (result.allowed) {
      await this.storage.setAlarm(Date.parse(day + 'T00:00:00Z') + 86400000);
    }
    return Response.json(result);
  }

  async alarm() {
    const budget = await this.storage.get('budget');
    const today = new Date().toISOString().slice(0, 10);
    if (!budget || budget.day !== today) await this.storage.deleteAll();
    else await this.storage.setAlarm(Date.parse(today + 'T00:00:00Z') + 86400000);
  }
}
