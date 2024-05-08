import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@assets": path.resolve("./src/assets/"),
			"@components": path.resolve("./src/components/"),
			"@ui": path.resolve("./src/components/ui"),
			"@forms": path.resolve("./src/components/forms"),
			"@context": path.resolve("./src/context/"),
			"@hooks": path.resolve("./src/hooks/"),
			"@pages": path.resolve("./src/pages/"),
			"@styles": path.resolve("./src/styles/"),
			"@types": path.resolve("./src/types/"),
			"@utils": path.resolve("./src/utils/"),
		},
	},
	plugins: [react()],
});
