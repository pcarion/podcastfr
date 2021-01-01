export function htmlStart(lines: string[], title: string): void {
  lines.push(`
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link href="/assets/css/styles.css" rel="stylesheet">
    <link rel="icon" href="/favicon.png">
  </head>
  <body class="bg-blue-200 font-sans">
    <div class="container mx-auto flex flex-col p-2 justify-center items-center max-w-full md:max-w-prose">
  `);
}

export function htmlEnd(lines: string[]): void {
  lines.push(`
    </div>
  </body>
  </html>
  `);
}
