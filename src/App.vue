<template>
    <div class="grid grid-cols-4 gap-5">
      <div class="flex-wrap">
        <form class="max-w-md mx-auto">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
    <label class="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer">
      <div
          @click="selectedProperty = !selectedProperty, console.log(selectedProperty)"
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
      </div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle selected only</span>
    </label>
     <Datepicker
         range
         lang="en"
         v-model="selectedDate"/>
    </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
        class = "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead class="text-xs text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400"
      >
      <tr>
        <th scope="col" class="px-6 py-3">ID #</th>
        <th scope="col" class="px-6 py-3">Category</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </tr>
      </thead>
      <tbody class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
             v-for="(item, index) in dataTable" :key="item.id"
      >
      <td class="px-6 py-4">{{ item.id }}</td>
          <td class="px-6 py-4">{{ item.workName }}</td>
          <td class="px-6 py-4">
            {{ item.status ? "Complete" : "Pending" }}
          </td>
          <td class="px-6 py-4">
            <button
                @click="toggleDetails(index)"
                class="text-blue-600 hover:underline flex items-center"
            >
              <span v-if="!item.showDetails">▼</span>
              <span v-else>▲</span>
            </button>
          </td>
        <!-- Additional row for details, conditionally rendered -->
        <tr v-if="item.showDetails" class="border-b">
          <td colspan="4" class="px-6 py-4">
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Work Type(s)</th>
              <th scope="col" class="px-6 py-3">Dates</th>
            </tr>
            <tr class="border-b">
              <td class="px-6 py-4">data pull from back-end</td>
              <td class="px-6 py-4">data pull from back-end</td>
            </tr>
            <tr>
            <th scope="col" class="px-6 py-3">Location</th>
            <th scope="col" class="px-6 py-3">Completed On</th>
            </tr>
            <tr class="border-b">
              <td class="px-6 py-4">data pull from back-end</td>
              <td class="px-6 py-4">data pull from back-end</td>
            </tr>
            <th scope="col" class="px-6 py-3">Quick Description</th>
            <tr>
            <td class="px-6 py-4">data pull from back-end</td>
            </tr>
            </thead>
          </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import VueDatepickerUi from 'vue-datepicker-ui';
import 'flowbite';

export default {
  components: {
    Datepicker: VueDatepickerUi,
  },
  data() {
    return {
      dataTable: [
        { id: "#1",
          workName: "Task 1",
          status: true,
          showDetails: false
        },
        {
          id: "#2",
          workName: "Task 2",
          status: false,
          showDetails: false,
        },
        { id: "#5",
          workName: "Task 3",
          status: true,
          showDetails: false
        },
        { id: "#4",
          workName: "Task 4",
          status: true,
          showDetails: false
        },
        // More items...
      ],
      selectedDate: [
        new Date(),
        new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000)
      ], //calculate date for calendar

      selectedProperty: false,} //flag to trigger properties selection

  },
  methods: {
    toggleDetails(index) {
      this.dataTable[index].showDetails = !this.dataTable[index].showDetails;
    },// get data from the table on-click then show its content
  },
}
</script>