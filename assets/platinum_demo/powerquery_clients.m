let
  Source = Csv.Document(File.Contents("clients.csv"),[Delimiter=",", Columns=6, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Promote = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Types = Table.TransformColumnTypes(Promote,{{"ClientID", type text},{"ClientName", type text},
     {"PrimaryCondition", type text},{"Location", type text},{"StartDate", type date},{"RiskLevel", type text}})
in
  Types