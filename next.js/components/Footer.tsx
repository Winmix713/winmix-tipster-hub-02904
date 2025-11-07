export default function Footer() {
  return (
    <footer className="border-t mt-20 py-8 px-4">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} WinMix Tipster Hub. All rights reserved.</p>
      </div>
    </footer>
  )
}
