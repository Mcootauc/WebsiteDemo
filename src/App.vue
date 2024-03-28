<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
      <tr>
        <th scope="col" class="px-6 py-3">ID #</th>
        <th scope="col" class="px-6 py-3">Category</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </tr>
      </thead>
      <tbody v-for="(item, index) in dataTable" :key="item.id">
        <tr class="border-b">
          <td class="px-6 py-4">{{ item.id }}</td>
          <td class="px-6 py-4">{{ item.workName }}</td>
          <td class="px-6 py-4">
            {{ item.status ? "Active" : "Inactive" }}
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
        </tr>
        <!-- Additional row for details, conditionally rendered -->
        <tr v-if="item.showDetails" class="border-b">
          <td colspan="4" class="px-6 py-4">
            <table
                class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Category</th>
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
export default {
  data() {
    return {
      dataTable: [
        { id: 1,
          workName: "Task 1",
          status: true,
          showDetails: false
        },
        {
          id: 2,
          workName: "Task 2",
          status: false,
          showDetails: false,
        },
        // More items...
      ],
    };
  },
  methods: {
    toggleDetails(index) {
      this.dataTable[index].showDetails =
          !this.dataTable[index].showDetails;
    },// get data from the table on-click then show its content
  },
};
</script>