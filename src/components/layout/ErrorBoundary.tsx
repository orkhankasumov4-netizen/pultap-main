import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Translation } from "react-i18next";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Translation>
          {(t) => (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
              <div className="bg-card border border-border shadow-lg rounded-3xl p-8 md:p-12 max-w-lg w-full">
                <div className="mx-auto w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                
                <h1 className="text-2xl font-bold mb-2 text-foreground">
                  {t("errorBoundary.title")}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {t("errorBoundary.description")}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    {t("errorBoundary.refresh")}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/'}
                    className="w-full sm:w-auto"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    {t("errorBoundary.home")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Translation>
      );
    }

    return this.props.children;
  }
}
