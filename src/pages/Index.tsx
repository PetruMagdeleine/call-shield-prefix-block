import { Phone, Shield, Settings, Info, Smartphone } from "lucide-react"
import StatusCard from "@/components/StatusCard"
import AddNumberForm from "@/components/AddNumberForm"
import BlockedNumberCard from "@/components/BlockedNumberCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCallBlocker } from "@/hooks/useCallBlocker"
import { useToast } from "@/hooks/use-toast"

const Index = () => {
  const {
    isBlocking,
    blockedNumbers,
    isLoading,
    platformInfo,
    totalBlocked,
    addBlockedNumber,
    removeBlockedNumber,
    toggleBlocking,
  } = useCallBlocker()
  const { toast } = useToast()

  const handleAddNumber = (prefix: string) => {
    const exists = blockedNumbers.some(num => num.prefix === prefix)
    if (exists) {
      toast({
        title: "Already blocked",
        description: "This number prefix is already in your blocked list",
        variant: "destructive",
      })
      return
    }

    addBlockedNumber(prefix)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Call Blocker</h1>
                <p className="text-primary-foreground/80">Block unwanted calls by number prefix</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Platform Info Card */}
        <Card className="bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Platform: {platformInfo.platform}</p>
                <p className="text-xs text-muted-foreground">
                  {platformInfo.isNative ? 'Native mobile app' : 'Web preview'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Card */}
        <StatusCard 
          isActive={isBlocking}
          totalBlocked={totalBlocked}
          onToggle={toggleBlocking}
        />

        {/* Add Number Form */}
        <AddNumberForm onAddNumber={handleAddNumber} />

        {/* Blocked Numbers List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Blocked Number Prefixes ({blockedNumbers.length})
          </h2>
          
          {blockedNumbers.length === 0 ? (
            <Card className="bg-muted/50">
              <CardContent className="p-8 text-center">
                <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No blocked numbers yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add a number prefix above to start blocking unwanted calls
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {blockedNumbers.map((number) => (
                <BlockedNumberCard
                  key={number.prefix}
                  prefix={number.prefix}
                  callsBlocked={number.callsBlocked}
                  onRemove={removeBlockedNumber}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-card to-card/80 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Add number prefixes to block all calls starting with those digits</p>
              <p>• The app monitors incoming calls and automatically blocks matching numbers</p>
              <p>• You can enable/disable protection at any time</p>
              <p>• Blocked calls are logged and counted for your reference</p>
              {!platformInfo.isNative && (
                <p className="text-warning font-medium">
                  📱 For full functionality, export to GitHub and build as native Android app
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
