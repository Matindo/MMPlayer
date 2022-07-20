<template>
  <div id="navbar">
    <b-navbar toggleable="md" type="dark">
      <b-navbar-brand href="" class="brand font-effect-shadow-multiple">OSIDPLAYER</b-navbar-brand>
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
@import url('https://fonts.googleapis.com/css?family=Rancho&effect=shadow-multiple');

  .navbar {
    background: #00000043;
    color: whitesmoke;
    margin-bottom: 0.5em;
  }
  .brand {
    font-family: 'Rancho';
    font-size: x-large;
  }
    .nav-link {
    color: whitesmoke;
    }
</style>
