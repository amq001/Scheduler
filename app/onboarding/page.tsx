"use client";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { OnboardingAction } from "../actions";
import { SubmitButton } from "../customComponents/SubmitButton";
import { onboardingSchema } from "../lib/zodSchemas";

export default function OnboardingRoute() {
  const [lastResult, action] = useActionState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Sch<span className="text-primary">edular</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile!
          </CardDescription>
        </CardHeader>
        <form
          className="flex flex-col gap-6"
          id={form?.id}
          onSubmit={form?.onSubmit}
          action={action}
        >
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields?.fullName?.initialValue}
                key={fields?.fullName?.key}
                placeholder="Aqib Mehtab"
              />
              <p className="text-red-500 text-sm">{fields?.fullName?.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                {/* <Input placeholder="Scheduler" /> */}
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm">
                  CalMarshal.com/
                </span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields?.userName?.initialValue}
                  key={fields?.userName?.key}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500 text-sm">{fields?.userName?.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
      {/* <h1>Hello from the onboarding route</h1> */}
    </div>
  );
}
