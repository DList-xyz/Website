<title>How It Works</title>
<description>How algorithms work on DList, and more.</description>
<url>how-it-works</url>

# How It Works

---

## Searching
`Overview`, `Body` and `Tags`, in order of use, are used to display results.

Property      | Search Weight
:-            |:-
`ID`          | 1
`Manager IDs` | 1
`Name`        | 0.8
`Overview`    | 0.6
`Body`        | 0.5
`Tags`        | 0.3

**Search weight** is how much power is given to the property value in yielding the search result. Hence, searching a bot by ID is *more specific* or *more accurate* than searching by *name*.