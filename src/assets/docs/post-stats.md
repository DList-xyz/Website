<title>Post Stats</title>
<description>A guide to show how to post stats to the DList API, in lots of popular programming languages.</description>
<url>post-stats</url>

# Post Stats
Here are examples of posting guild stats to the DList API.

---

## Finding Your Guild API Token

Go to **Dashboard** -> **Your Guild** -> **API**
or go to: `https://DList.co/dashboard/guilds/[yourGuildId]/api`
and replace `yourGuildId` with your 18 character Discord Guild ID. 

---

## Guild Stats

Property  | Type
:---------|:------------
guildCount | Number

---

### JavaScript
`Browser`

```
const guildId = '301520172194201602'; // your guild Snowflake ID
const guildAPIToken = 'b344b2d1-8fd0-4ef7-b7d8-1567d4e337c7'; // your guild API token

fetch(`https://DList.co/api/guilds/${guildId}/stats`, {
  body: JSON.stringify({ guildCount: guild.guilds.cache.size }),
  headers: {
    'Authorization': guildAPIToken,
    'Content-Type': 'application/json'
  },
  method: 'POST',
});
```

---

### NodeJS

```
const fetch = require('node-fetch');
```

See [JavaScript Implementation](docs/post-stats/#javascript) above.

---

*If you have any more examples to contribute, please join the [Discord Server](/server) to send them.*