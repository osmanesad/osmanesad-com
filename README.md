# osmanesad.com – Like System with Supabase

This repository contains the source code for **osmanesad.com**, including a
simple, global **like system** built with **Supabase** and vanilla JavaScript.

The goal of the like system is:

- Each visitor can like a post **only once**
- Like counts are **shared globally**
- All users see the same total like count for a post
- No authentication required

---

## How the Like System Works

The system is based on **two tables** and **one RPC function** in Supabase.

### 1. Tables

#### `post_likes`
Stores the total like count per post.

| column       | type    | description                  |
|--------------|---------|------------------------------|
| slug         | text    | unique post identifier (PK) |
| likes_count  | integer | total likes for the post    |

---

#### `post_like_events`
Stores individual like events to prevent multiple likes
from the same visitor.

| column      | type        | description                              |
|-------------|-------------|------------------------------------------|
| slug        | text        | post identifier                          |
| visitor_id | text        | unique visitor id (per browser)          |
| created_at | timestamptz | timestamp                                |

Primary key: `(slug, visitor_id)`

---

## Visitor Identification

Each browser gets a unique `visitor_id` stored in `localStorage`.

---

## Atomic Like Function (RPC)

Likes are handled through a Supabase RPC function to avoid race conditions and
ensure data consistency.

---

## Local Development

Use a local server:

```bash
python3 -m http.server 5500
```

---

## License

MIT

---

## Author

Osman Esad  
https://osmanesad.com
