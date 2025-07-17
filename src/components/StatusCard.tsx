import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Shield, ShieldCheck, ShieldAlert, Activity } from "lucide-react"

interface StatusCardProps {
  isActive: boolean
  totalBlocked: number
  onToggle: (active: boolean) => void
}

const StatusCard = ({ isActive, totalBlocked, onToggle }: StatusCardProps) => {
  return (
    <Card className={`bg-gradient-to-br shadow-[var(--shadow-card)] transition-all duration-300 ${
      isActive 
        ? 'from-success-light to-success-light/50 border-success/20' 
        : 'from-warning-light to-warning-light/50 border-warning/20'
    }`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isActive ? (
              <ShieldCheck className="w-6 h-6 text-success" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-warning" />
            )}
            Call Blocking Status
          </div>
          <Switch 
            checked={isActive} 
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-success"
          />
        </CardTitle>
        <CardDescription>
          {isActive ? 'Protection is active' : 'Protection is disabled'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalBlocked}</div>
            <div className="text-sm text-muted-foreground">Total Calls Blocked</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Activity className={`w-4 h-4 ${isActive ? 'text-success' : 'text-warning'}`} />
            </div>
            <div className="text-sm text-muted-foreground">
              {isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatusCard