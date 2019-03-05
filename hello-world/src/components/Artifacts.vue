<template>
  <div>
    <h1>Circle CI Artifacts</h1>
    <div v-html="badge_svg"></div>
    <div>{{ badge_url }}</div>
    <div v-html="badge_img_html"></div>
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
      badge_url: "",
      badge_svg: ""
    };
  },
  methods: {
    getArtifacts() {
      apiService.getLatestArtifacts().then(artifactJson => {
        var p = artifactJson.data.find(function(p) {
          return (
            p.path == "root/project/coverage-reports/tally/htmlcov/coverage.svg"
          );
        });
        this.badge_url = p.url;
        var url = "https://cors-anywhere.herokuapp.com/" + p.url;
        apiService
          .getURL(url)
          .then(data => {
            this.badge_svg = data.data;
          })
          .catch(error => console.log(error));
      });
    }
  },
  computed: {
    badge_img_html: function() {
      return "<img src=" + this.badge_url + "></>";
    }
  },
  mounted() {
    this.getArtifacts();
  }
};
</script>
