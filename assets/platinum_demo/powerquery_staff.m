let
  Source = Csv.Document(File.Contents("staff.csv"),[Delimiter=",", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Promote = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Types = Table.TransformColumnTypes(Promote,{{"StaffID", type text},{"FirstName", type text},{"LastName", type text},
     {"Role", type text},{"MobileEnabled", type logical},{"HireDate", type date},{"FullName", type text}}),
  AddEmail = Table.AddColumn(Types, "Email", each Text.Lower([FirstName] & "." & [LastName] & "@platinum.local"))
in
  AddEmail