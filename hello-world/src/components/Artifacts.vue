<template>
  <div>
    <h1>Artifacts</h1>
    <div v-html="badge"></div>
  </div>
</template>

<script>
import { APIService } from "../APIService";

const apiService = new APIService();

export default {
  name: "Artifacts",
  components: {},
  data() {
    return {
      badge: ""
    };
  },
  methods: {
    getArtifacts() {
      apiService.getLatestArtifacts().then(artifactJson => {
        var p = artifactJson.data.find(function(p) {
          return (
            p.path == "root/project/coverage-reports/sgi/htmlcov/coverage.svg"
          );
        });
        var url = "https://cors-anywhere.herokuapp.com/" + p.url;
        apiService
          .getURL(url)
          .then(data => {
            this.badge = data.data;
          })
          .catch(error => console.log(error));
      });
    }
  },
  mounted() {
    this.getArtifacts();
  }
};
</script>
