import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
	return {
		base: 'https://www.asvesot.com/merkautoec',
		build: {
			outDir: 'build',
		},
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: 'https://coficeptrx.asvesot.com:8014',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
