<title>Changelog</title>
<description>Updates to DList and the DList API.</description>
<url>changelog</url>

# Changelog

---

## Alpha

---

### v0.0.3a
`Upcoming`

<!-- ![v0.0.3a](/assets/docs/img/v0.0.3a.png) -->

**Add**:
- `*` -> semi auto sitemap generation
- `/search` -> search by server manager ID

---

### v0.0.2a
`22/08/2020`

![v0.0.2a](/assets/docs/img/v0.0.2a.png)

**Add**:
- `/guilds/:id` -> report captcha
- `/api/v1/guilds` -> `guild.managerIds: string[]` -> IDs of users who can manage a server listing 

**Change/Fix**:
- `/` -> higher quality icons
- `/` -> bumped guilds only show if they have been bumped
- `/dashboard/servers/:id/edit` -> users with `Manage Server` can now edit their server listing
- `/dashboard/servers/:id/edit` -> fixed `Invalid Access Token` disco-oauth bug
- `/search` -> you can now search by server ID or server name 
- `/search` -> search by tags now filters correctly
- `/api/v1/guilds/:id/stats` -> `stats.topVoters` now returns correct value

**Remove**:
- `/api/v1/guilds` -> unnecessary guild properties

---

### v0.0.1a
`18/08/2020`

![v0.0.1a](/assets/docs/img/v0.0.1a.png)

[DList](/) and the [DList Discord Server](/server) is released!
The first version was made across [4 live streams](https://youtube.com/ADAMJR).