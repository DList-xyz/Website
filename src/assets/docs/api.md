<title>API</title>
<description>Interact with DList through HTTP requests.</description>
<url>api</url>

# API
- Interact with DList through HTTP requests

## Uses
- Server interaction for dashboard
- OAuth2 Discord authorization

## Status Codes
Code | Description
-----|-------------
400  | Key is invalid, or an error occurred with the request
404  | Route could not be found
429  | Too many requests
500  | Internal server error (rare)

**API Error Example**:
`{ code: 400, message: 'Bad Request' }`

---

## Rate Limiting
DList uses rate limiting to reduce API abuse.

A maximum of *600 requests* can be sent *per 10 minutes*.

---

## Server 

## Server Stats
You can view the stats of a server, including voting, servers and more.

**URL**: `https://dlist.xyz/api/v1/guilds/:id/stats`

### Reponse

**Schema**:
```ts
{
  general: { // general guild stats
    memberCount: number,
    lastVoteAt: Date,
    totalVotes: number,
    voteCount: number
  },
  topVoters: { // users ranked by votes
    userId: string;
    count: number;
  },
  recentVotes: { // votes per day, during last 7 days
    count: number;
    day: number;
  },
  votes: { // week votes
    at: Date;
    by: string;
  }
}
```

**Example**: `https://dlist.xyz/api/v1/guilds/744166274028011561/stats`