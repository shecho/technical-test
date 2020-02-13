<template>
  <div>
    <input
      type="text"
      v-model="search"
      placeholder="Search title.."
      class="btn btn-sm btn-outline-primary m-5"
    />

    <!-- <button btn btn-sm btn-outline-primary v-on:click="filterCourses">Find</button> -->
    <div class="container p-4">
      <div class="row">
        <div class="col-md-4" v-for="course in filteredCourses " :key="course._id">
          <div class="card mb-2 box-shadow post-cards">
            <img v-bind:src="course.imageURL" class="card-img-top" />
            <div class="card-body">
              <h5 class="capitalize">{{ course.name }}</h5>
              <p class="card-text">{{ course.description.slice(0, 120) }}...</p>
            </div>
          </div>
        </div>
      </div>
      <!--     Loop through the pages array to display each page number(still not working propertly.)       -->
      <!-- <div class="btn-group col-md-2 offset-md-5">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          v-if="page != 1"
          @click="page--"
        ></button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          v-for="pageNumber in pages.slice(page - 1, page + 5)"
          @click="page = pageNumber"
          :key="pageNumber"
        >{{ pageNumber }}</button>
        <button
          type="button"
          @click="page++"
          v-if="page < pages.length"
          class="btn btn-sm btn-outline-secondary"
        >>></button>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      baseURL: "http://localhost:3000",
      page: 1,
      perPage: 10,
      pages: [],
      displayed: [],
      search: ""
    };
  },
  created() {
    this.getCourses();
    /*  this.filterCourses(); */
  },
  methods: {
    async getCourses() {
      const res = await this.axios.get(`${this.baseURL}/courses`);
      this.courses = res.data.data.items;
      /* console.log(this.courses);

      console.log("--------------------------------");
      console.log(res.data);
      console.log(this.courses[0].name); */
    },
    /*  filterCourses() {
      this.courses = []; */
    /* console.log("is working" + this.search); */
    /* this.courses = this.courses.filter(course => {
        return course.name.toLowerCase().includes(this.search.toLowerCase()); */
    /* this.courses.push(object(course)); */
    /*  });
      console.log("testing");
      console.log(this.courses);
    } */

    /*NOT WORKING yet  */
    /*  setCourses() {
      let numberOfPages = Math.ceil(this.courses.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(courses) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return courses.slice(from, to);
    }
  },
  watch: {
    courses() {
      this.setCourses();
    } 
  },
  computed: {
    displayedCourses: function() {
      return this.paginate(this.courses);
    } */
    /*  
  /* object error. pending  to read documentation to look for a fix */

    computed: {
      filteredCourses: function() {
        return this.courses.filter(course => {
        /*   return course.name.toLowerCase().includes(this.search.toLowerCase()); */
        });
      }
    }
  }
};
</script>
