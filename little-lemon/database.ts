import axios from 'axios';
import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import localApi from './assets/data/capstone.json';

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const OFFICIAL_IMAGE_URL_PREFIX = "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images";
const IMAGE_URL_PREFIX = "https://raw.githubusercontent.com/DavidMiserak/Little-Lemon-RN/refs/heads/main/little-lemon/assets/images";
const DB_NAME = "little_lemon";

// Define the MenuItem type
export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}


// Sanitize the menu data
const sanitizeMenu = (data: any) => {
  const menu: MenuItem[] = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const menuItem: MenuItem = {
      id: i,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    };
    menu.push(menuItem);
  }

  return menu;
}


// Fetch data from the API
const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = await response.data.menu;
    const menu: MenuItem[] = sanitizeMenu(data);

    return menu;
  } catch (error) {
    console.error(error);
  }
}


// Get the image URL
export const getImageUrl = (image: string) => {
  return `${IMAGE_URL_PREFIX}/${image}?raw=true`;
}


// Fetch data from the local API
const fetchLocalData = async () => {
  const data = localApi.menu;
  const menu: MenuItem[] = sanitizeMenu(data);

  return menu;
}


// Get the categories
export const getCategories = async () => {
  if (Platform.OS === 'web') {
    const data = await fetchLocalData();
    const categories = data ? data.map((item: MenuItem) => item.category) : [];

    return [...new Set(categories)];
  }

  const sqlite = await SQLite.openDatabaseAsync(DB_NAME);
  const sql = "SELECT DISTINCT category FROM menu";
  const result = await sqlite.getAllAsync(sql);

  return result.map((item: any) => item.category);
}


// Create the table in the local SQLite database
const createTable = async () => {
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
    sql = "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)";
    const data = await fetchLocalData();

    let menuItems: MenuItem[] = data ? data : [];
    for (let item of menuItems) {
      let insertResult = await sqlite.runAsync(sql, [item.name, item.price, item.description, item.image, item.category]);
      console.log("Row inserted: ", insertResult);
    }
  }
}


// Get data from the local SQLite database
const getData = async () => {
  if (Platform.OS === 'web') {
    return await fetchLocalData();
  }

  await createTable();

  const sqlite = await SQLite.openDatabaseAsync(DB_NAME);

  let sql = "SELECT * FROM menu";
  let result = await sqlite.getAllAsync(sql);
  console.log("All rows: ", result.length);

  return result;
}


// Get the menu items
export const getMenuItems = async () => {
  const data = await getData();
  return data;
}


// Filter the data by query and categories
export const filterByQueryAndCategories = async (query: any, activeCategories: any) => {
  if (Platform.OS === 'web') {
    const data: any = await fetchLocalData();
    const filteredData = data.filter((item: MenuItem) => {
      return item.name.toLowerCase().includes(query.toLowerCase()) && activeCategories.includes(item.category);
    });

    return filteredData;
  }

  const placeholders = activeCategories.map(() => '?').join(',');
  const sql = `SELECT * FROM menu WHERE name LIKE ? AND category IN (${placeholders})`;

  const sqlite = await SQLite.openDatabaseAsync(DB_NAME);
  const result = await sqlite.getAllAsync(sql, [`%${query}%`, ...activeCategories]);

  return result;
}
