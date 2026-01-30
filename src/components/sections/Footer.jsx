export function Footer() {
    return (
        <footer className="py-8 bg-background border-t border-border">
            <div className="container mx-auto px-6 text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Mit Prajapati. All rights reserved.</p>
            </div>
        </footer>
    )
}
