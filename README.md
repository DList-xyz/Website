# DList Dashboard
Dashboard to customize DList; made with TypeScript + Angular 9 -> https://dlist.xyz

![Guild Dashboard](https://dlist.xyz/assets/docs/img/dashboard-v0.1.0b.png)

## Discord Guild Setup
Make sure you have redirects set to the /auth link you will be using.
This will be used in the final step of the OAuth2 login.
  
![Redirects](https://i.ibb.co/5TC6Yn3/redirects.png)

---

## Further Notes
- **Channels and roles are publically available through the API**
  - Used to provide more user-friendly select options
  - This is to also to avoid rate limiting
- **Everything within the /src folder is public**
  - Keep the API, Server, and guild isolated to avoid extra bundle size, or your guild tokens being bundled on the client side (not good)
  - Just avoid associating any tokens or secrets with the webapp itself
  - This also applies to the guild
- **If renaming config files, make sure to .gitignore them**
 - This is done by default, but I've made this mistake many times
