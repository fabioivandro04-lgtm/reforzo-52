import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import SEO from '@/components/SEO';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Edit2, Plus, UserPlus, UserMinus, Shield, ArrowLeft, Home } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  created_at: string;
  onboarding_completed: boolean;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  granted_at: string;
  profiles: {
    email: string;
    full_name: string;
  } | null;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', price: '' });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [roleEmail, setRoleEmail] = useState('');
  const [roleToGrant, setRoleToGrant] = useState('user');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, profilesRes, rolesRes] = await Promise.all([
        supabase.from('services').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('user_roles').select('*').order('granted_at', { ascending: false })
      ]);

      if (servicesRes.error) throw servicesRes.error;
      if (profilesRes.error) throw profilesRes.error;
      if (rolesRes.error) throw rolesRes.error;

      setServices(servicesRes.data || []);
      setProfiles(profilesRes.data || []);
      
      // Fetch profiles for roles manually
      const rolesWithProfiles = await Promise.all(
        (rolesRes.data || []).map(async (role) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('user_id', role.user_id)
            .single();
          
          return {
            ...role,
            profiles: profile
          };
        })
      );
      
      setUserRoles(rolesWithProfiles);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceData = {
        name: serviceForm.name,
        description: serviceForm.description,
        price: parseFloat(serviceForm.price),
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        if (error) throw error;
        toast({ title: "Success", description: "Service updated successfully" });
      } else {
        const { error } = await supabase
          .from('services')
          .insert(serviceData);
        if (error) throw error;
        toast({ title: "Success", description: "Service created successfully" });
      }

      setServiceForm({ name: '', description: '', price: '' });
      setEditingService(null);
      fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      });
    }
  };

  const handleServiceDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast({ title: "Success", description: "Service deleted successfully" });
      fetchData();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const handleGrantRole = async () => {
    try {
      const { data, error } = await supabase.rpc('grant_role_by_email', {
        _email: roleEmail,
        _role: roleToGrant as 'admin' | 'moderator' | 'user'
      });

      if (error) throw error;
      if (!data) {
        toast({
          title: "Error",
          description: "User not found with that email",
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Success", description: `${roleToGrant} role granted successfully` });
      setRoleEmail('');
      fetchData();
    } catch (error) {
      console.error('Error granting role:', error);
      toast({
        title: "Error",
        description: "Failed to grant role",
        variant: "destructive",
      });
    }
  };

  const handleRevokeRole = async (email: string, role: string) => {
    try {
      const { data, error } = await supabase.rpc('revoke_role_by_email', {
        _email: email,
        _role: role as 'admin' | 'moderator' | 'user'
      });

      if (error) throw error;
      toast({ title: "Success", description: `${role} role revoked successfully` });
      fetchData();
    } catch (error) {
      console.error('Error revoking role:', error);
      toast({
        title: "Error",
        description: "Failed to revoke role",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Admin Panel - Reforzo"
        description="Administrative dashboard for managing services, users, and roles"
      />
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
              <Badge variant="default" className="bg-primary">
                <Shield className="w-3 h-3 mr-1" />
                Administrator
              </Badge>
            </div>
            <p className="text-muted-foreground">Manage services, users, and system settings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Site
              </a>
            </Button>
          </div>
        </div>

        {/* Admin Alert */}
        <Alert className="mb-6 border-destructive/50 bg-destructive/10">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Administrative Access:</strong> You are accessing sensitive system management tools. 
            All actions are logged and monitored.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Services Management
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              User Management
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Role Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Services Management</h2>
                <p className="text-muted-foreground">Create, edit, and manage system services</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingService(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Service Name</Label>
                      <Input
                        id="name"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={serviceForm.price}
                        onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit">
                      {editingService ? 'Update Service' : 'Create Service'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingService(service);
                          setServiceForm({
                            name: service.name,
                            description: service.description || '',
                            price: service.price.toString(),
                          });
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleServiceDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{service.description}</p>
                    <p className="font-semibold">${service.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <p className="text-muted-foreground">View and manage all registered users</p>
            </div>
            <div className="grid gap-4">
              {profiles.map((profile) => (
                <Card key={profile.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{profile.full_name || 'No name provided'}</span>
                      <Badge variant={profile.onboarding_completed ? 'default' : 'secondary'}>
                        {profile.onboarding_completed ? 'Active' : 'Pending'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Email:</strong> {profile.email}</p>
                      <p><strong>Company:</strong> {profile.company_name || 'Not provided'}</p>
                      <p><strong>Phone:</strong> {profile.phone_number || 'Not provided'}</p>
                      <p><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Role Management</h2>
                <p className="text-muted-foreground">Grant and revoke user permissions</p>
              </div>
              <Card className="p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="User email"
                    value={roleEmail}
                    onChange={(e) => setRoleEmail(e.target.value)}
                  />
                  <select
                    value={roleToGrant}
                    onChange={(e) => setRoleToGrant(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button onClick={handleGrantRole}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Grant Role
                  </Button>
                </div>
              </Card>
            </div>

            <div className="grid gap-4">
              {userRoles.map((userRole) => (
                <Card key={userRole.id}>
                  <CardContent className="flex items-center justify-between pt-6">
                    <div>
                      <p className="font-semibold">{userRole.profiles?.full_name || 'No name'}</p>
                      <p className="text-sm text-muted-foreground">{userRole.profiles?.email}</p>
                      <Badge variant="outline" className="mt-1">
                        {userRole.role}
                      </Badge>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRevokeRole(userRole.profiles?.email || '', userRole.role)}
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      Revoke
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;