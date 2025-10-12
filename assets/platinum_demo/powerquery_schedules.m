let
  Source = Csv.Document(File.Contents("schedules.csv"),[Delimiter=",", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Promote = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Types = Table.TransformColumnTypes(Promote,{{"ScheduleID", type text},{"ScheduleDate", type date},
     {"ClientID", type text},{"StaffID", type text},{"PlannedStart", type time},{"PlannedEnd", type time},
     {"PlannedMinutes", Int64.Type}})
in
  Types