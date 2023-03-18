<script lang="ts">
  import { page } from '$app/stores';
  const isActive = (path: string) => {
    return $page.route.id === path ? 'active' : '';
  }
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
  <div class="container-fluid">
    <span class="navbar-brand">Genshin Ascension Tracker (GAT)</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link {isActive('/')}" aria-current="page" href="/">Characters</a>
        </li>
        <li class="nav-item">
          <a class="nav-link {isActive('/inventory')}" href="/inventory">Inventory</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
