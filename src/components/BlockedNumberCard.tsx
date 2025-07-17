import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, X, Shield } from "lucide-react"
import { useState } from "react"

interface BlockedNumberCardProps {
  prefix: string
  callsBlocked: number
  onRemove: (prefix: string) => void
}

const BlockedNumberCard = ({ prefix, callsBlocked, onRemove }: BlockedNumberCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      onRemove(prefix)
    }, 200)
  }

  return (
    <Card className={`bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)] transition-all duration-300 ${isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-light rounded-full">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{prefix}</p>
              <p className="text-sm text-muted-foreground">
                {callsBlocked} call{callsBlocked !== 1 ? 's' : ''} blocked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-success">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Active</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BlockedNumberCard