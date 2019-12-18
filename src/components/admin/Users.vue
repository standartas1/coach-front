<template>
  <div>
    <table class="t table table-bordered table-dark">
      <thead class="thead-dark">
        <th>Full Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </thead>
      <tbody class="tbody" v-if="users.items">
        <tr v-for="user in users.items" :key="user._id">
          <td>
            <span>{{ user.name }}</span>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <div>
              <span v-if="user.loading">
                <em>- Loading...</em>
              </span>
              <button @click="update(user._id)" class="button btn">Update</button>
              <span v-if="user.deleting">
                <em>- Deleting...</em>
              </span>
              <em v-else-if="user.deleteError">- ERROR: {{ user.deleteError }}</em>
              <a v-else class="button btn" @click="deleteUser(user._id)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <UserModal v-if="this.user" @clicked="onModalClick" :isOpen="isOpen" :user="user" :role="role"></UserModal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import UserModal from "./UserModal";
export default {
  computed: {
    ...mapState({
      users: state => state.users.all,
      user: state => state.users.user
    })
  },
  components: {
    UserModal: UserModal
  },
  created() {
    this.getAllUsers();
  },
  data() {
    return {
      isOpen: false,
      role: "Administrator"
    };
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      getById: "getById",
      deleteUser: "delete"
    }),
    onModalClick(value) {
      this.isOpen = value;
    },
    update(id) {
      this.isOpen = !this.isOpen;
      this.getById(id);
      mapMutations("users", {
        getById: "getByIdSuccess"
      });
    }
  }
};
</script>

<style lang="scss">
.button {
  border: 0;
  background-color: $color-leather !important;
  color: black;
  margin: 0 6px;
  &:focus,
  &:hover {
    background-color: darken($color-leather, 5%) !important;
  }
}
.table {
  // box-shadow: 0px 0px 12px $color-storm; //
  font-family: $Roboto;
}
.tbody {
  background-color: white;
  border-color: $color-storm !important;
  color: black;
}
.thead-dark {
  text-transform: uppercase;
  th {
    background-color: $color-storm !important;
    border-color: $color-storm !important;
    color: $color-moon !important;
  }
}
tr {
  td {
    padding: 6px 10.5px !important;
    &:last-of-type {
      text-align: center;
    }
  }
}
</style>