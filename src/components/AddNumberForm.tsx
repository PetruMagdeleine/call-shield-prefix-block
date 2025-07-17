import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddNumberFormProps {
  onAddNumber: (prefix: string) => void
}

const AddNumberForm = ({ onAddNumber }: AddNumberFormProps) => {
  const [prefix, setPrefix] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prefix.trim()) {
      toast({
        title: "Invalid number",
        description: "Please enter a valid phone number prefix",
        variant: "destructive",
      })
      return
    }

    if (prefix.length < 3) {
      toast({
        title: "Prefix too short",
        description: "Please enter at least 3 characters",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onAddNumber(prefix.trim())
      setPrefix("")
      setIsLoading(false)
      toast({
        title: "Number blocked",
        description: `Calls starting with "${prefix.trim()}" will now be blocked`,
        variant: "default",
      })
    }, 500)
  }

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Block Number Prefix
        </CardTitle>
        <CardDescription>
          Enter a phone number prefix to block all calls starting with those digits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prefix">Number Prefix</Label>
            <Input
              id="prefix"
              placeholder="e.g., +330162 or 555"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="font-mono"
            />
          </div>
          <Button 
            type="submit" 
            variant="security" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Block Number Prefix
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddNumberForm