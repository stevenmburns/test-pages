<template>
  <div>
    <h1>Circle CI Artifacts</h1>
    <div v-for="(el,idx) in badge_img_htmls" :key="idx">
      {{ el.name }}
      <span v-html="el.img_html"></span>
    </div>
    <div>{{ badge_urls[0] }} {{ badge_urls[1] }}</div>
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
      badge_urls: [],
      badge_url_tally: "",
      badge_url_sgi: ""
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
        this.badge_url_tally = p.url;
        this.badge_urls.push(p.url);
      });
      apiService.getLatestArtifacts().then(artifactJson => {
        var p = artifactJson.data.find(function(p) {
          return (
            p.path == "root/project/coverage-reports/sgi/htmlcov/coverage.svg"
          );
        });
        this.badge_url_sgi = p.url;
        this.badge_urls.push(p.url);
      });
    }
  },
  computed: {
    badge_img_html_tally: function() {
      return "<img src=" + this.badge_urls[0] + "></>";
    },
    badge_img_html_sgi: function() {
      return "<img src=" + this.badge_urls[1] + "></>";
    },
    badge_img_htmls: function() {
      return [
        { name: "tally", img_html: this.badge_img_html_tally },
        { name: "sgi", img_html: this.badge_img_html_sgi }
      ];
    }
  },
  mounted() {
    this.getArtifacts();
  }
};
</script>
