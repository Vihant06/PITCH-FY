import { defineQuery } from "next-sanity";

// ✅ Corrected STARTUPS_QUERY with proper operator precedence
export const STARTUPS_QUERY = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  (
    !defined($search) ||
    title match $search ||
    category match $search ||
    author->name match $search
  )
] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

// ✅ Fetch startup by ID
export const STARTUP_BY_ID_QUERY = defineQuery(`*[
  _type == "startup" && _id == $id
][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);

// ✅ Fetch startup views
export const STARTUP_VIEWS_QUERY = defineQuery(`*[
  _type == "startup" && _id == $id
][0]{
  _id, views
}`);

// ✅ Fetch author by GitHub ID
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[
  _type == "author" && id == $id
][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

// ✅ Fetch author by Sanity _id
export const AUTHOR_BY_ID_QUERY = defineQuery(`*[
  _type == "author" && _id == $id
][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

// ✅ Fetch author by username
export const AUTHOR_BY_USERNAME_QUERY = defineQuery(`
  *[_type == "author" && username == $username][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

// ✅ Fetch all startups by author reference
export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`*[
  _type == "startup" && author._ref == $id
] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

// ✅ Fetch playlist and resolve referenced startups
export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`*[
  _type == "playlist" && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
