const { buyTollRoadCard, topUpBalance, useTollRoad } = require('./utils');

async function getTollAccess() {
  try {
    // Langkah 1: Beli kartu tol
    const cardInfo1 = await buyTollRoadCard(25);
    console.log("Langkah 1: Membeli kartu tol", cardInfo1);

    // Langkah 2: Isi saldo kartu tol
    const cardInfo2 = await topUpBalance(cardInfo1, 10);
    console.log("Langkah 2: Mengisi saldo kartu tol", cardInfo2);

    // Langkah 3: Gunakan akses jalan tol
    const result = await useTollRoad(cardInfo2);
    console.log("Langkah 3: Menggunakan akses jalan tol", result);
  } catch (error) {
    console.log("Terjadi error:", error.message);
  }
}

// Jangan hapus kode di bawah ini
getTollAccess();
