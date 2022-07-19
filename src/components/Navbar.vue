<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="dark">
      <b-navbar-brand href="#">OSIDPLAYER</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item active-class="active" class="nav-link" to="/">HOME</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
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
