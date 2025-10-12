let
  Source = Csv.Document(File.Contents("rls_user_map.csv"),[Delimiter=",", Columns=3, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Promote = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Types = Table.TransformColumnTypes(Promote,{{"UserEmail", type text},{"StaffID", type text},{"RoleLevel", type text}})
in
  Types