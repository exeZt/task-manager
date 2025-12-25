// sw.js
const CACHE_NAME = 'pwa-version-1';

const assets = [
	'app.manifest.json',
	'public/ico_32.svg',
	'public/ico_64.svg',
	'public/ico_128.svg',
];

self.addEventListener('install', (evt) => {
	evt.waitUntil(
		self.skipWaiting().then(() => {
			return caches.open(CACHE_NAME)
				.then((cache) => {
					return cache.addAll(assets)
						.catch(err => {
							console.log('Failed to cache assets:', err)
						})
				})
		})
	);
});

function fromCache(request) {
	return caches.open(CACHE).then((cache) =>
		cache.match(request).then((matching) =>
			matching || Promise.reject('no-match')
		));
}

function update(request) {
	return caches.open(CACHE).then((cache) =>
		fetch(request).then((response) =>
			cache.put(request, response)
		)
	);
}

// could't work, backend not ready
self.addEventListener("push", (event) => {
	if (!(self.Notification && self.Notification.permission === "granted")) {
		return;
	}

	const data = event.data?.json() ?? {};
	const title = data.title || "We are missed you :(";
	const message =
		data.message || "Here's something you might want to check out.";
	const icon = "public/ico_64.svg";

	const notification = new self.Notification(title, {
		body: message,
		tag: "New task created!",
		icon,
	});

	// or any other IPv4
	notification.addEventListener("click", () => {
		clients.openWindow(
			"http://127.0.0.1:5173", 
		);
	});
});