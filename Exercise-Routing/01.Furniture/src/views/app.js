import { page } from "./renderer.js";
import { loadHome } from "./home.js";
import { loadRegiter } from "./register.js";
import { loadCatalog } from "./catalog.js";
import { loadLogin } from "./login.js";
import { onLogout } from "./logout.js";
import { loadCreateForm } from "./create.js";
import { loadDetails } from "./details.js";
import { loadMyPublications } from "./myPublications.js";
import { editContent } from "./edit.js";
import { deleteContent } from "./delete.js";

page("/", loadHome);
page("/home", loadHome);
page("/catalog", loadCatalog);
page("/catalog/:id", loadDetails);
page("/delete/:id", deleteContent);
page("/edit/:id", editContent)
page("/create", loadCreateForm);
page("/my-furniture", loadMyPublications);
page("/logout", onLogout);
page("/login", loadLogin);
page("/register", loadRegiter);
page();