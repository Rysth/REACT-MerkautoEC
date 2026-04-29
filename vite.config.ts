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
					target: 'http://coficeptrx.asvesot.com:8013',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
