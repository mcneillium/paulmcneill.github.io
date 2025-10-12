let
  Source = Csv.Document(File.Contents("visits.csv"),[Delimiter=",", Columns=10, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Promote = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Types = Table.TransformColumnTypes(Promote,{{"VisitID", type text},{"VisitDate", type date},
     {"ClientID", type text},{"StaffID", type text},{"Completed", type logical},{"ActualStart", type time},
     {"ActualEnd", type time},{"DurationMinutes", Int64.Type},{"Notes", type text},{"SatisfactionScore", Int64.Type}}),
  AddMonth = Table.AddColumn(Types, "Month", each Date.StartOfMonth([VisitDate]), type date)
in
  AddMonth