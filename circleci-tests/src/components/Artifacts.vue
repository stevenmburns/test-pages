<template>
  <div>
    <h1>circleci-test</h1>
    <div v-for="(el,idx) in badge_img_htmls" :key="idx">
      {{ el.name }}
      <span v-html="el.img_html"></span>
    </div>
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
      badge_urls: []
    };
  },
  methods: {
    getArtifacts() {
      apiService.getLatestArtifacts().then(artifactJson => {
        var subprojects = ["tally", "sgi", "enumerate"];
        this.badge_urls = subprojects.map(function(el) {
          var p = artifactJson.data.find(function(p) {
            return (
              p.path ==
              "root/project/coverage-reports/" + el + "/htmlcov/coverage.svg"
            );
          });
          var q = artifactJson.data.find(function(p) {
            return (
              p.path ==
              "root/project/coverage-reports/" + el + "/htmlcov/index.html"
            );
          });
          return { name: el, url: p.url, index: q.url };
        });
      });
    }
  },
  computed: {
    badge_img_htmls: function() {
      return this.badge_urls.map(function(obj) {
        return {
          name: obj.name,
          img_html:
            "<a href=" + obj.index + ">" + "<img src=" + obj.url + "></a>"
        };
      });
    }
  },
  mounted() {
    this.getArtifacts();
  }
};
</script>
