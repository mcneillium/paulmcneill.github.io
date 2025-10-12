-- Microsoft Access logical schema (portable SQL DDL for illustration)
CREATE TABLE Clients (
  ClientID TEXT PRIMARY KEY,
  ClientName TEXT NOT NULL,
  PrimaryCondition TEXT,
  Location TEXT,
  StartDate DATE,
  RiskLevel TEXT
);

CREATE TABLE Staff (
  StaffID TEXT PRIMARY KEY,
  FirstName TEXT NOT NULL,
  LastName TEXT NOT NULL,
  Role TEXT NOT NULL,
  MobileEnabled YESNO,
  HireDate DATE
);

CREATE TABLE Training (
  TrainingID AUTOINCREMENT PRIMARY KEY,
  StaffID TEXT NOT NULL,
  TrainingType TEXT NOT NULL,
  CompletionDate DATE,
  ExpiryDate DATE,
  Status TEXT,
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

CREATE TABLE Schedules (
  ScheduleID TEXT PRIMARY KEY,
  ScheduleDate DATE,
  ClientID TEXT NOT NULL,
  StaffID TEXT NOT NULL,
  PlannedStart TEXT,
  PlannedEnd TEXT,
  PlannedMinutes INTEGER,
  FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

CREATE TABLE Visits (
  VisitID TEXT PRIMARY KEY,
  VisitDate DATE,
  ClientID TEXT NOT NULL,
  StaffID TEXT NOT NULL,
  Completed YESNO,
  ActualStart TEXT,
  ActualEnd TEXT,
  DurationMinutes INTEGER,
  Notes TEXT,
  SatisfactionScore INTEGER,
  FOREIGN KEY (ClientID) REFERENCES Clients(ClientID),
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);