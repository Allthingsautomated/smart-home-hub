import { drizzle } from "drizzle-orm/mysql2";
import { pricingProducts, laborRates } from "./drizzle/schema.ts";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

async function seedPricing() {
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Add labor rates
    await db.insert(laborRates).values([
      {
        clientType: "residential",
        hourlyRate: 90,
        description: "Residential installation labor rate",
      },
      {
        clientType: "commercial",
        hourlyRate: 125,
        description: "Commercial installation labor rate",
      },
    ]);

    console.log("✓ Labor rates added");

    // Add Caséta products
    await db.insert(pricingProducts).values([
      {
        systemType: "caseta",
        productType: "hub",
        name: "Caséta Smart Bridge (Hub)",
        price: 99.99,
        description: "Wireless hub for Caséta system",
      },
      {
        systemType: "caseta",
        productType: "dimmer",
        name: "Caséta Dimmer Switch",
        price: 49.99,
        description: "Wireless dimmer for lights",
      },
      {
        systemType: "caseta",
        productType: "keypad",
        name: "Caséta Pico Remote",
        price: 29.99,
        description: "Wireless control remote",
      },
    ]);

    console.log("✓ Caséta products added");

    // Add RA3 products
    await db.insert(pricingProducts).values([
      {
        systemType: "ra3",
        productType: "hub",
        name: "RA3 Smart Bridge (Hub)",
        price: 299.99,
        description: "Professional wired hub for RA3",
      },
      {
        systemType: "ra3",
        productType: "dimmer",
        name: "RA3 Dimmer Module",
        price: 149.99,
        description: "Professional dimmer control",
      },
      {
        systemType: "ra3",
        productType: "keypad",
        name: "RA3 Keypad",
        price: 199.99,
        description: "Professional keypad control",
      },
    ]);

    console.log("✓ RA3 products added");

    // Add HomeWorks products
    await db.insert(pricingProducts).values([
      {
        systemType: "homeworks",
        productType: "hub",
        name: "HomeWorks Processor",
        price: 2499.99,
        description: "Enterprise-grade processor",
      },
      {
        systemType: "homeworks",
        productType: "dimmer",
        name: "HomeWorks Dimmer",
        price: 899.99,
        description: "Enterprise dimmer module",
      },
      {
        systemType: "homeworks",
        productType: "keypad",
        name: "HomeWorks Keypad",
        price: 599.99,
        description: "Enterprise keypad control",
      },
    ]);

    console.log("✓ HomeWorks products added");
    console.log("\n✅ All pricing data seeded successfully!");

    await connection.end();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    await connection.end();
    process.exit(1);
  }
}

seedPricing();
