const pool = require("./pool");

async function getUserInfo(id){
    const { rows } = await pool.query("SELECT * FROM member_information WHERE id = ($1)", [id]);
    return rows[0];
}

async function getPostInfo() {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY post_id DESC");
    return rows;
}

async function insertUserPass(firstname, lastname, username, password){
    await pool.query("INSERT INTO member_information (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstname, lastname, username, password]);
}

async function createPost(id, username, title, post) {
    await pool.query("INSERT INTO posts (member_id, author, post_title, content) VALUES ($1, $2, $3, $4)", [id, username, title, post]);
}

async function deletePost(post_id) {
    await pool.query("DELETE FROM posts WHERE post_id = $1", [post_id]);
}

module.exports = {
    getUserInfo,
    getPostInfo,
    insertUserPass,
    createPost,
    deletePost
}