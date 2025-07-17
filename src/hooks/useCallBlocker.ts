import { useState, useEffect } from 'react';
import { callBlockerService } from '@/services/CallBlockerService';
import { useToast } from '@/hooks/use-toast';

export interface BlockedNumber {
  prefix: string;
  callsBlocked: number;
}

export const useCallBlocker = () => {
  const [isBlocking, setIsBlocking] = useState(true);
  const [blockedNumbers, setBlockedNumbers] = useState<BlockedNumber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [platformInfo, setPlatformInfo] = useState({ isNative: false, platform: 'web' });
  const { toast } = useToast();

  useEffect(() => {
    const initializeService = async () => {
      setIsLoading(true);
      
      try {
        // Get platform info
        const info = callBlockerService.getPlatformInfo();
        setPlatformInfo(info);

        // Request permissions if on native platform
        if (info.isNative) {
          const hasPermissions = await callBlockerService.requestPermissions();
          if (!hasPermissions) {
            toast({
              title: "Permissions Required",
              description: "Please grant phone permissions to use call blocking",
              variant: "destructive",
            });
          }
        }

        // Load existing blocked prefixes
        const prefixes = await callBlockerService.getBlockedPrefixes();
        const numbersWithCounts = await Promise.all(
          prefixes.map(async (prefix) => ({
            prefix,
            callsBlocked: await callBlockerService.getBlockedCallsCount()
          }))
        );
        
        setBlockedNumbers(numbersWithCounts);
        
        // Add some demo data if no existing data
        if (numbersWithCounts.length === 0) {
          const demoNumbers = [
            { prefix: "+330162", callsBlocked: 15 },
            { prefix: "555", callsBlocked: 8 },
            { prefix: "+1800", callsBlocked: 23 },
          ];
          setBlockedNumbers(demoNumbers);
        }
      } catch (error) {
        console.error('Failed to initialize call blocker:', error);
        toast({
          title: "Initialization Error",
          description: "Failed to initialize call blocking service",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeService();
  }, [toast]);

  const addBlockedNumber = async (prefix: string) => {
    try {
      const success = await callBlockerService.addBlockedPrefix(prefix);
      if (success) {
        setBlockedNumbers(prev => [...prev, { prefix, callsBlocked: 0 }]);
        toast({
          title: "Number blocked",
          description: `Calls starting with "${prefix}" will now be blocked`,
          variant: "default",
        });
      } else {
        throw new Error('Failed to add blocked prefix');
      }
    } catch (error) {
      console.error('Failed to add blocked number:', error);
      toast({
        title: "Error",
        description: "Failed to add blocked number",
        variant: "destructive",
      });
    }
  };

  const removeBlockedNumber = async (prefix: string) => {
    try {
      const success = await callBlockerService.removeBlockedPrefix(prefix);
      if (success) {
        setBlockedNumbers(prev => prev.filter(num => num.prefix !== prefix));
        toast({
          title: "Number unblocked",
          description: `Calls starting with "${prefix}" are no longer blocked`,
          variant: "default",
        });
      } else {
        throw new Error('Failed to remove blocked prefix');
      }
    } catch (error) {
      console.error('Failed to remove blocked number:', error);
      toast({
        title: "Error",
        description: "Failed to remove blocked number",
        variant: "destructive",
      });
    }
  };

  const toggleBlocking = async (enabled: boolean) => {
    try {
      const success = await callBlockerService.setBlockingEnabled(enabled);
      if (success) {
        setIsBlocking(enabled);
        toast({
          title: enabled ? "Protection enabled" : "Protection disabled",
          description: enabled 
            ? "Call blocking is now active" 
            : "Call blocking has been disabled",
          variant: enabled ? "default" : "destructive",
        });
      } else {
        throw new Error('Failed to toggle blocking');
      }
    } catch (error) {
      console.error('Failed to toggle blocking:', error);
      toast({
        title: "Error",
        description: "Failed to update blocking status",
        variant: "destructive",
      });
    }
  };

  const totalBlocked = blockedNumbers.reduce((sum, num) => sum + num.callsBlocked, 0);

  return {
    isBlocking,
    blockedNumbers,
    isLoading,
    platformInfo,
    totalBlocked,
    addBlockedNumber,
    removeBlockedNumber,
    toggleBlocking,
  };
};