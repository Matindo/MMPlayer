<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="dark">
      <b-navbar-brand href="#">OSIDPLAYER</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item active-class="active" class="nav-link" to="/">HOME</b-nav-item>
          <b-nav-item active-class="active" class="nav-link" to="/">SEARCH</b-nav-item>
          <b-nav-item active-class="active" class="nav-link" to="/">ALBUMS</b-nav-item>
          <b-nav-item active-class="active" class="nav-link" to="/">VIDEOS</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown-->

          <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>ACCOUNT</em>
              </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
  .navbar {
    background: #00000043;
    color: whitesmoke;
    margin-bottom: 0.5em;
  }
    .nav-link {
    color: whitesmoke;
    }
</style>
