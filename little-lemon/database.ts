import axios from 'axios';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const IMAGE_URL_PREFIX = "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images";
const DB_NAME = "little_lemon";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const fetchData = async () => {
  return axios.get(API_URL)
    .then(response => response.data.menu)
    .catch(error => console.error(error));
}

export const getImageUrl = (image: string) => {
  return `${IMAGE_URL_PREFIX}/${image}?raw=true`;
}

const getData = async () => {
  if (Platform.OS === 'web') {
    return await fetchData();
  }

  const sqlite = await SQLite.openDatabaseAsync(DB_NAME);

  let sql = "CREATE TABLE IF NOT EXISTS menu " +
    "(id INTEGER PRIMARY KEY AUTOINCREMENT, " +
    "name TEXT, " +
    "price REAL, " +
    "description TEXT, " +
    "image TEXT, " +
    "category TEXT)";

  let createResult = await sqlite.runAsync(sql);
  console.log("Table created: ", createResult);

  sql = "SELECT * FROM menu";
  let firstRow = await sqlite.getFirstAsync(sql);
  console.log("First row: ", firstRow);

  if (!firstRow) {
    const data = await fetchData();
    sql = "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)";
    for (let item of data) {
      let insertResult = await sqlite.runAsync(sql, [item.name, item.price, item.description, item.image, item.category]);
      console.log("Insert result: ", insertResult);
    }
  };

  sql = "SELECT * FROM menu";
  let result = await sqlite.getAllAsync(sql);
  console.log("All rows: ", result.length);

  return result;
};

export const getCategories = async () => {
  if (Platform.OS === 'web') {
    const data = await fetchData();
    const categories = data.map((item: MenuItem) => item.category);

    return [...new Set(categories)];
  }

  const sqlite = await SQLite.openDatabaseAsync(DB_NAME);
  const sql = "SELECT DISTINCT category FROM menu";
  const result = await sqlite.getAllAsync(sql);

  return result.map((item: any) => item.category);
};

export const getMenuItems = async () => {
  const data = await getData();
  return data;
}
