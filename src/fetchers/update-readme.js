const axios = require('axios');
const fs = require('fs');

// Fetch information about your repositories
axios.get('https://api.github.com/users/fullstop125/repos')
  .then((response) => {
    // Parse the response and extract information about your latest repository
    const latestRepo = response.data[0];

    // Update the contents of the section in your README with the information about your latest repository
    const latestRepoSection = `### Latest Repository\n\n[${latestRepo.name}](${latestRepo.html_url})`;

    const readme = fs.readFileSync('README.md', 'utf-8');
    const updatedReadme = readme.replace(/<!--START_SECTION:latest_repository-->[\s\S]*<!--END_SECTION:latest_repository-->/gm, `<!--START_SECTION:latest_repository-->\n${latestRepoSection}\n<!--END_SECTION:latest_repository-->`);
    fs.writeFileSync('README.md', updatedReadme);
  })
  .catch((error) => {
    console.log(error);
  });
