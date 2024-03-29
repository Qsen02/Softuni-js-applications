import { page } from "./renderer.js";
import { loadHome } from "./home.js";
import { loadRegisterForm } from "./register.js";
import { loadLoginForm } from "./login.js";
import { onLogout } from "./logout.js";
import { loadCatalog } from "./dashboard.js";
import { loadCreateForm } from "./create.js";
import { loadDetails } from "./details.js";
import { loadEditForm } from "./edit.js";
import { onDelete } from "./delete.js";
import { onLike } from "./liking.js";

page("/", loadHome);
page("/home", loadHome);
page("/catalog", loadCatalog);
page("/catalog/:id", loadDetails);
page("/edit/:id", loadEditForm);
page("/delete/:id", onDelete);
page("/likes/:id", onLike);
page("/create", loadCreateForm);
page("/logout", onLogout);
page("/login", loadLoginForm);
page("/register", loadRegisterForm);
page();