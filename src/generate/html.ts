export function htmlStart(lines: string[]): void {
  lines.push(`
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="/assets/css/styles.css" rel="stylesheet">
  </head>
  <body class="bg-blue-200 h-screen font-sans">
    <div class="container mx-auto h-full flex flex-col justify-center items-center">
  `);
}

export function htmlEnd(lines: string[]): void {
  lines.push(`
    </div>
  </body>
  </html>
  `);
}
