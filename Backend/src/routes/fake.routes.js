import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { faker } from "@faker-js/faker";

const uploadUrl = "http://localhost:3000/issue/upload-problem"; // Update with correct API URL

// Generate a random past date (last 30 days)
const getRandomPastDate = () => {
  const daysAgo = faker.number.int({ min: 1, max: 30 });
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Generate a random problem object
const generateProblem = () => ({
  title: faker.lorem.words(5),
  description: faker.lorem.sentences(2),
  location: JSON.stringify({
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  }),
  filePath: "./test-image.jpeg", // Ensure this file exists
  createdAt: getRandomPastDate(), // Random past month date
});

// Upload a single problem
const uploadProblem = async (problemData) => {
  const formData = new FormData();
  formData.append("title", problemData.title);
  formData.append("description", problemData.description);
  formData.append("location", problemData.location);
  formData.append("file", fs.createReadStream(problemData.filePath));
  formData.append("createdAt", problemData.createdAt); // Optional: Ensure backend supports this field

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: { ...formData.getHeaders() }, // Fix headers for FormData
    });
    console.log(`✅ Uploaded: ${problemData.title} (Created At: ${problemData.createdAt})`);
  } catch (error) {
    console.error(`❌ Failed to upload: ${problemData.title}`, error.response?.data || error.message);
  }
};

// Upload multiple problems (50)
const uploadMultipleProblems = async () => {
  const problems = Array.from({ length: 50 }, generateProblem);
  for (const problem of problems) {
    await uploadProblem(problem);
  }
};

export default uploadMultipleProblems; // ✅ Export only the function
