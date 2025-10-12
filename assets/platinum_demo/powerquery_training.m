let
  Source = Csv.Document(File.Contents("training.csv"),[Delimiter=",", Columns=5, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Promote = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Types = Table.TransformColumnTypes(Promote,{{"StaffID", type text},{"TrainingType", type text},
     {"CompletionDate", type date},{"ExpiryDate", type date},{"Status", type text}})
in
  Types