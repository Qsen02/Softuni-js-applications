import { page, middlewear } from "./middlewear.js";
import { loadHome } from "./home.js";
import { loadRegisterForm } from "./register.js";
import { loadLoginForm } from "./login.js";
import { onLogout } from "./logout.js";
import { loadCatalog } from "./catalog.js";
import { loadCreateForm } from "./create.js";
import { loadDetails } from "./details.js";
import { loadEditForm } from "./edit.js";
import { onDelete } from "./delete.js";

page(middlewear());
page("/", loadHome);
page("/catalog", loadCatalog);
page("/catalog/:id", loadDetails);
page("/edit/:id", loadEditForm);
page("/delete/:id", onDelete);
page("/create", loadCreateForm);
page("/logout", onLogout);
page("/login", loadLoginForm);
page("/register", loadRegisterForm);
page.start();