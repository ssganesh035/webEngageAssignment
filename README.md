# Express CSV Generator

---

## Description
This project creates an Express.js route `/generate-csv` that fetches data from three APIs, generates a CSV file, and returns its file path.

---

## How to Run
1. Clone the repository: 
```git clone https://github.com/ssganesh035/webEngageAssignment```

---

2. Install dependencies: 
```npm install```

---

3. Start the server: 
```node main.js```

4. Make a GET request to: 
```http://localhost:3000/generate-csv```

---

## Dependencies
- Express
- Axios
- csv-writer
- path

---

## File Details
The generated CSV file is saved in the project directory as `result.csv`.