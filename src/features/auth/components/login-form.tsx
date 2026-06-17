'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthFormLayout } from '@/features/auth/components/auth-form-layout'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { getDashboardPath, sanitizeRedirectPath } from '@/features/auth/utils/route-utils'
import { type LoginFormValues, loginSchema } from '@/features/auth/validations/auth-schemas'
import { getLoginErrorMessage } from '@/lib/api/api-error'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true)

    try {
      const user = await login(values)
      const redirect = sanitizeRedirectPath(
        searchParams.get('redirect'),
        getDashboardPath(user.role)
      )

      toast.success('Login realizado com sucesso.')
      router.replace(redirect)
    } catch (error) {
      toast.error(getLoginErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <AuthFormLayout
      title="Entrar"
      description="Acesse sua conta para reservar e comprar ingressos."
      footer={
        <>
          Ainda não tem conta?{' '}
          <Link href="/register/customer" className="font-medium text-primary hover:underline">
            Cadastre-se como cliente
          </Link>{' '}
          ou{' '}
          <Link href="/register/partner" className="font-medium text-primary hover:underline">
            como parceiro
          </Link>
          .
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            {...register('password')}
          />
          {errors.password ? (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </AuthFormLayout>
  )
}
